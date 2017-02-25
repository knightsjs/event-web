angular.module('app')
  .factory('University', ($q, $http, ServerUrls, _) => {
    let baseUrl = ServerUrls.current.nodeApi + 'university'

    let University = (initData) => {
      let uni = {}
      angular.extend(uni, initData)

      // Instance Methods
      return uni
    }

    // Class Methods
    let Universities = {

      findAll (params) {
        return $http.get(baseUrl, params)
          .then((uni) => {
            return _.map(uni, (i) => {
              return new University(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (id) {
        return $http.get(baseUrl + '/' + id)
          .then((uni) => {
            return University.new(uni)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new University
      create (data) {
        return $http.post(baseUrl, data)
          .then((uni) => {
            return University.new(uni)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (params) {
        return $http.put(baseUrl + '/' + params.id, params)
          .then((uni) => {
            return University.new(uni)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (id) {
        return $http.delete(baseUrl + '/' + id)
          .then((uni) => {
            return University.new(uni)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return Universities
  })