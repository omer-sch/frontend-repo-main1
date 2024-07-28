import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBarLine/BarLine';
import PostsList from './components/Posting/PostsList';
import Register from './components/Registeration/Register';
//import test from '../src/components/test';
import Profile from './components/Profile/Profile';
import MyPosts from './components/Posting/MyPosts';
import Login from '../src/components/Registeration/Login';
import PostComments from './components/Comments/PostComment';
import Maps from '../src/components/Map/GoogleMaps';
import AddPost from './components/Posting/AddPost';
import OpenWeather from './components/Weather/OpenWeather';
import rain from './components/Weather/Rain';
function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={PostsListfunc} />
          <Route path='/register' component={Register} />

          <Route path='/profile' component={ProfilePage} />

          <Route path='/myposts' component={MyPost} />
          <Route path='/login' component={Login} />
          <Route path='/userpost/:postId' component={PostComments2} />
          <Route path='/map' component={Map} />
          <Route path='/add-post' component={AddMyPost} />
          <Route path='/weather' component={OpenWeather2} />
          <Route path='/rain' component={rain} />


          {/* Add more routes here as needed */}
        </Switch>
      </Router>
    </div>
  );
}

function PostsListfunc() {
  return (
    <>
      <Navbar />
      <PostsList />
    </>
  );
}
function ProfilePage() {
  return (
    <>
      <Navbar />
      <Profile />
    </>
  );
}
function MyPost() {
  return (
    <>
      <Navbar />
      <MyPosts />
    </>
  );
}
function Map() {
  return (
    <>
      <Navbar />
      <Maps latitude={100} longitude={100} />
    </>
  );
}

function OpenWeather2() {
  return (
    <>
      <Navbar />
      <OpenWeather/>
    </>
  );
}

function AddMyPost(){
  return(
    <>
      <Navbar />
      <AddPost />
    </>
  );
}
function PostComments2(){
  return(
    <>
      <Navbar />
      <PostComments />
    </>
  );
}
export default App;
