export default function Logout(){
    localStorage.setItem('token', '');
    window.location.replace('/login')

}