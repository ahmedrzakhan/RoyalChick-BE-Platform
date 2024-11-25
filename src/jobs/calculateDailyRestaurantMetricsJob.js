const { pool } = require('../config/database');

const calculateDailyRestaurantsMetricsInBatches = async (batchSize = 100) => {
  try {
    let processedCount = 0;
    let errorCount = 0;

    // Get all active restaurants
    const [restaurants] = await pool.query(`
      SELECT id, name
      FROM restaurants
      WHERE status = 'ACTIVE'
    `);

    // Process restaurants in batches
    for (let i = 0; i < restaurants.length; i += batchSize) {
      const batch = restaurants.slice(i, i + batchSize);
      await processBatch(batch);
      processedCount += batch.length;
    }

    console.log(`
      Daily metrics calculation completed:
      - Processed: ${processedCount} restaurants
      - Errors: ${errorCount}
    `);
  } catch (error) {
    console.error('Error in daily metrics calculation:', error);
    throw error;
  }

  async function processBatch(restaurants) {
    // Process each restaurant in the batch concurrently
    await Promise.all(
      restaurants.map(async (restaurant) => {
        try {
          const [orders] = await pool.query(
            `
                SELECT COUNT(*) as total_orders
                FROM orders
                WHERE restaurant_id = ?
                AND DATE(created_at) = DATE(NOW())
                AND status = 'COMPLETED'
              `,
            [restaurant.id],
          );

          const totalOrders = orders[0].total_orders;

          await pool.query(
            `
            INSERT INTO restaurant_metrics
            (restaurant_id, date, total_orders_completed)
            VALUES (?, CURDATE(), ?)
          `,
            [restaurant.id, totalOrders],
          );

          console.log(
            `Metrics added for restaurant "${restaurant.name}" (ID: ${restaurant.id}): ${totalOrders} orders`,
          );
        } catch (error) {
          errorCount++;
          console.error(
            `Error processing metrics for restaurant ${restaurant.id}:`,
            error,
          );
        }
      }),
    );
  }
};

module.exports = {
  calculateDailyRestaurantsMetricsInBatches,
};
