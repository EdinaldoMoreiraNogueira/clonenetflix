
import React, { useEffect, useState } from 'react';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header';
import './App.css'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  
  useEffect(()=> {
    const loadAll = async() => {
      //Pegando a lista TOTAL
  let list = await tmdb.getHomeList();
  setMovieList(list)
      //Pegando o FeaturedMovie

      let originals = list.filter(i=>i.slug === 'originals');
      let ramdomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[ramdomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
     
      setFeaturedData(chosenInfo)
    }
    loadAll()
  }, []);

    useEffect(()=> {
      const scrollListem = () => {
       if(window.scrollY > 10) {
         setBlackHeader(true);
       } else {
         setBlackHeader(false);
       }
      }
      window.addEventListener('scroll', scrollListem);

      return ()=> {
        window.removeEventListener('scroll', scrollListem);
      }
    },[])

  return (
    <div className="page">

      <Header black={blackHeader} />

     {featuredData &&
     <FeaturedMovie item={featuredData} />
     }
     
     <section className="lists">
       {movieList.map((item, key)=>(
       <MovieRow key={key} title={item.title} items={item.items} />
       ))}
     </section>
     <footer>
       Feito com <span role="img" aria-label="coração"><FavoriteTwoToneIcon/> Por Devnaldo </span>
        Direitos de imagem para a Netflix  <br/>
       Dados pegos no site Themoviedb.org
     </footer>
     {movieList.length <= 0 && 
     <div className ="loading">
       <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading-gif" alt="carregando"></img>
     </div>
      }
    </div>
  )
}
