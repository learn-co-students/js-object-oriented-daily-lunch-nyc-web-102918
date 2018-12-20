// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let counter = 0

class Neighborhood {
  constructor(name) {
    this.id = counter++
    this.name = name

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals() {
    const deliveries = this.deliveries()
    let meals = []
    deliveries.forEach(delivery => {
      const foundMeal = store.meals.find(meal => meal.id === delivery.mealId)

      if (!meals.includes(foundMeal)) {
        meals.push(foundMeal)
      }
    })
    return meals
  }
}

class Meal {
  constructor(title, price) {
    this.id = counter++
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    const deliveries = this.deliveries()
    let customers = []
    deliveries.forEach(delivery => {
      const foundCustomer = store.customers.find(customer => customer.id === delivery.customerId)

      if (!customers.includes(foundCustomer)) {
        customers.push(foundCustomer)
      }
    })
    return customers
  }

  static byPrice() {
    const meals = [...store.meals]
    meals.sort((m1, m2) => {
      return m2.price - m1.price
    })
    return meals
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = counter++
    this.name = name
    this.neighborhoodId = neighborhoodId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    const deliveries = this.deliveries()
    let meals = []
    deliveries.forEach(delivery => {
      const foundMeal = store.meals.find(meal => meal.id === delivery.mealId)
      meals.push(foundMeal)
    })
    return meals
  }

  totalSpent() {
    const mealPrices = this.meals().map(meal => meal.price)
    const reducer = (total, mealPrice) => total + mealPrice;
    return mealPrices.reduce(reducer)
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = counter++
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
