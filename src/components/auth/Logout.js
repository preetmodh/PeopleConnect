export default function Logout(){
    localStorage.setItem('token', '');
    localStorage.setItem('name', '');
    window.location.replace('/login')

}