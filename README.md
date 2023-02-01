Left To Do:

- More thourough validation:
  - Check for params types
  - Validate related order & item exist before creating a new OrderItem
  - Extract the validation in its own function
- Use Reddis cache:
  - Create a key-value cache for Orders
  - Decide on a cache eviction and cache invalidation strategy, potentially a simple write-around with time to live & Least Recently Used startegies
  - In getOrderById check in cache for the requested order before hitting the DB.
- User authentication? (User table with credentials & authentication middleware to protect routes)
- Integration tests with testing database in addition to the current mocking of data access functions
