import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Loading from './Loading.js';
import Nav from './Nav.js';
import Feed from './Feed.js';

function App() {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(localStorage.likedPosts ? JSON.parse(localStorage.likedPosts) : []); 

  const today = new Date();
  const year = today.getFullYear()
  const month = (today.getMonth() + 1) <= 9 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)
  const day = today.getDate();
  const todayParam = `${year}-${month}-${day}`

  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - 20);

  const endYear = endDate.getFullYear();
  const endMonth = (endDate.getMonth() + 1) <= 9 ? "0" + (endDate.getMonth() + 1) : (endDate.getMonth() + 1);
  const endDay = endDate.getDate();
  const endParam = `${endYear}-${endMonth}-${endDay}`
  
  // Astronomy Picture of The Day
  useEffect(() => {
    axios({
      url: 'https://api.nasa.gov/planetary/apod',
      method: 'GET',
      params: {
        api_key: 'PKjTPrZB5JJ6DyFtZ15aDVwhE36gtIrxN4LLMLal',
        start_date: endParam,
        end_date: todayParam
      }
    }).then((response) => {
      setPost(response.data);
      setIsLoading(false);
    })
  }, [endParam, todayParam])

  const handleLike = (post, isItLiked) => {
    const newLikes = [...likedPosts];
    // this empty array is a problem
    let arrayWithLikesRemoved = []
    if (isItLiked === true) {
      const indexOfPostToRemove = indexOfPostThatIsAlreadyLiked(post.url);
      if (indexOfPostToRemove === undefined) {
        // this is a problem
        arrayWithLikesRemoved.push(post);
      }
      setLikedPosts(arrayWithLikesRemoved)
    } else {
      newLikes.push(post);
      setLikedPosts(newLikes); 
    }
  }

  const isItLiked = (urlToCompare) => {
    let isItInLikedPosts = false; 
    likedPosts.forEach((post) => {
      if (post.url === urlToCompare) {
        isItInLikedPosts = true
      }
    })
    return isItInLikedPosts;
  }

  const indexOfPostThatIsAlreadyLiked = (urlToCompare) => {
    let indexOfMatchedPost;
    likedPosts.forEach((post, index) => {
      if (post.url === urlToCompare) {
        indexOfMatchedPost = index
      }
    })
    return indexOfMatchedPost;
  }
  
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    console.log(likedPosts);
  }, [likedPosts])


  return (
      <div className="App"> 
        {
          isLoading ? <Loading /> : 
          <Nav 
          likedSubNav = {likedPosts}
          />
        }
        <main>
          <section className="wrapper">
            <ul>
              {
                post.slice(0).reverse().map((image, index) => {
                  return (
                    <Feed 
                    imgSrc={image.url} 
                    title={image.title} 
                    description={image.explanation}
                    key={image.copyright}
                    date={image.date}
                    handleLikeFunction = {() => handleLike(image, isItLiked(image.url))}
                    isItLiked = {isItLiked(image.url)}
                    completePost = {image}
                    key={index}
                    />
                  )
                })
              }
            </ul>
          </section>
        </main>
      </div>
  );
}

export default App;