export const checkAuth = (err) => {
  if(err.response.status == 403 || err.response.status == 401){
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
}