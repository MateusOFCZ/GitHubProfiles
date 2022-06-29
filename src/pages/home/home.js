import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import Config from '../../assets/config.json';
import { useParams, useLocation } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Changelog from '../changelog/changelog';
import './styles.css';

export default function Home() {
  const Pathname = useLocation().pathname;
  let { username } = useParams();

  const HomeControls = useAnimation();
  const ChangelogControls = useAnimation();
  const EmphasisControls = useAnimation();

  const [Page, setPage] = useState(Pathname);
  const [Data, setData] = useState();
  const [Username, setUsername] = useState(username || Config.GITHUB_USERNAME);

  const ChangeEphasis = () => {
    EmphasisControls.start({ color: ['#FFFFFF', '#0061BB', '#FFFFFF', '#0061BB', '#FFFFFF'], transition: { duration: 1 } });

    setTimeout(() => {
      EmphasisControls.stop();
      document.getElementById('username_input').focus();
    }, 1000);
  }

  const Search = async (Username) => {
    if (Username) {
      axios.get(`https://api.github.com/users/${Username}/repos?type=owner&sort=updated`)
        .then(function (response) {
          setData(response.data);
          setUsername(Username);
        }).catch(function (err) {
          console.error(err.message);
          console.warn(`User ${Username} not found.`);
          setData(null);
          setTimeout(() => {
            Search(Username);
          }, 5000);
        });
    }
  }

  const ChangePage = async (Page) => {
    if (Page === '/changelog') {
      HomeControls.start({ x: '-200%', opacity: 0, transition: { duration: 1 } });

      setTimeout(() => {
        HomeControls.stop();
        setPage(Page);
      }, 700);
    } else {
      ChangelogControls.start({ x: '200%', opacity: 0, transition: { duration: 1 } });

      setTimeout(() => {
        ChangelogControls.stop();
        setPage(Page);
      }, 700);
    }
  }

  if (!Data) {
    setTimeout(() => {
      Search(Username);
    }, 5000);
  }

  return (
    <motion.div className='body' transition={{ duration: 10, repeat: Infinity, repeatDelay: 0 }} animate={{ backgroundPosition: ['0%', '100%', '0%'] }}>
      {Page.includes('/changelog') ?
        <Changelog ChangePage={ChangePage} ChangelogControls={ChangelogControls} />
        :
        <motion.div className="Home">
          {!!Data ?
            <motion.div animate={HomeControls}>
              <motion.div transition={{ duration: 2 }} initial={{ x: '-200%', opacity: 0 }} animate={{ x: '0%', opacity: 1 }}>
                <motion.span className='information'>
                  <motion.div className='information_item' onClick={(e) => ChangeEphasis()} transition={{ duration: 1, delay: 1.5 }} initial={{ x: '-110%', opacity: 0 }} animate={{ opacity: 1, x: '2%' }}>
                    <FontAwesomeIcon icon={faInfoCircle} className='icon' /> <span className='text'>You can search for the GitHub username by clicking on the <b>title</b> and pressing enter.</span>
                  </motion.div>
                </motion.span>
                <motion.div className='changelog_page' onClick={(e) => ChangePage('/changelog')} transition={{ duration: 1, delay: 2 }} initial={{ x: '110%', opacity: 0 }} animate={{ opacity: 1, x: '0%' }}>
                  <span className='text'>Changelog</span> <FontAwesomeIcon icon={faArrowRight} className='icon' />
                </motion.div>
                <motion.div className='panel' transition={{ duration: 10, repeat: Infinity, repeatDelay: 0 }} animate={{ boxShadow: ['0 0 1vw 0.1vw #FFFFFF', '0 0 1vw 0.6vw #FFFFFF', '0 0 1vw 0.1vw #FFFFFF'] }}>
                  <div className='header'>
                    <motion.div transition={{ duration: 0.5, delay: 1.5 }} initial={{ y: '-350%' }} animate={{ y: '0%' }}>
                      <motion.span animate={EmphasisControls}>
                        <input id='username_input' className='username_input' type='text' autoComplete='off' value={Username} onBlur={(e) => Search(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && Search(e.target.value)} onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}></input>
                      </motion.span>
                    </motion.div>
                  </div>
                  <motion.div className='card_list' transition={{ duration: 2, delay: 1.5 }} initial={{ y: '350%' }} animate={{ y: '0%' }}>
                    {Object.keys(Data).map((Key, Index) => (
                      <motion.div key={Index} className='card' transition={{ duration: 0.5 }} whileHover={{ scale: 1.05 }} viewport={{ once: false }} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
                        <a className='title' href={Data[Key].html_url} target='_blank'>{Data[Key].name}</a>
                        <div>
                          <label className='label'>Description:</label>
                          <span className='content'> {Data[Key].description ? Data[Key].description : 'Without description.'}</span>
                          <br />
                          <label className='label'>Last Update:</label>
                          <span className='content'> {Data[Key].updated_at ? `${moment(Data[Key].updated_at).format('LLL')}.` : 'Without update.'}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            :
            <div>
              <div className="loader">
                <motion.img src={`${Config.ASSETS_LINK}GitHubMark.png`} transition={{ duration: 1, repeat: Infinity, repeatDelay: 0 }} animate={{ scale: [0.9, 1, 0.9], opacity: [0.5, 1, 0.5] }} />
              </div>
            </div>}
        </motion.div>
      }
    </motion.div>
  );
}