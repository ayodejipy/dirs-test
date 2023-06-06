## Implementation

1. What libraries did you add to the frontend? What are they used for?
- Pinia: a store library for Vue, it allows you to share a state across components/pages (recommended library for vue 3)
- Axios: a promise based http client for making requests and handling responses
- Tailwindcss: a utility first css framework that makes styling easy and faster
- Typescript: adds typing checking capabilities to the project and helps with better error checking and code navigation


2. What would you change about your implementation if you had to handle thousands of items?

- I would ensure the api returns data in chunks i.e 15 items per page for faster response time; then add skeleton loader for loading animation and pagination on the FE to help navigate through each array of items. 

## General

1. If you had more time, what further improvements or new features would you add?
- Correctly name my modules, i.e 'modal' it not only perform modal operation but eventually house the code for fetching menus
- Proper type declaration for some of the data
- Would give the vendor the choice to add total number of available quantity and also provide buttons where the vendor can decrease or increase the quantity based on sales made which would in turn determine whether the menu is sold out or not
- Could add a clear all menu functionality
- Add order history tracking on the dashboard as well, I included an example in the codebase
- Add proper validation to form to add menu
- Display notifications or error/success messages in a more decorated way, i.e using toasts
- Write a more suitable composable that is more effective that exposes data, loading, error or success states to avoid repetitions
- Would love to introduct vue-query, to help with caching and invalidating and refetching data
- maybe a simple authentication too

2. Which parts are you most proud of? And why?
- The design, it took some couple of mins to start pulling some components together.
- Code quality, in terms on reuseable components, making use of composables without having to break alot of things. 

3. Which parts did you spend the most time with? What did you find most difficult?
- Design, coming up with a design that would best suit the user story
- The modal component took some time too
- Data structuring and segmenting the menus by categories

4. How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.

- Overall, I think it was fun, I like the subtle challenge of thinking about how to structure the data you being passed and how to manipulate the data. 
Did you have any issues or have difficulties completing? - Not really, I had help by using some of the components I have used in some project to make the design part less of a burden. Test looks great, maybe further extend by letting the vendor handle order taking or POS part of as well. 
Thank you. 
