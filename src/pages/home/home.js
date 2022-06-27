import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import Config from '../../assets/config.json';
import Particles from 'react-tsparticles';
import { tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './styles.css';

export default function Home() {
  let { username } = useParams();
  if (!username) {
    username = Config.GITHUB_USERNAME;
  }

  const CardVariants = {
    visible: { scale: 1, transition: { duration: 1 } },
    hidden: { scale: 0, transition: { duration: 1 } }
  };

  const [Data, setData] = useState();

  const particlesInit = async (main) => {
    await loadFull(tsParticles);
  };

  if (!Data) {
    setInterval(() => {
      if (Data == null) {
        axios.get(`https://api.github.com/users/${username}/repos?type=owner&sort=updated`)
          .then(function (response) {
            setData(response.data);
          }).catch(function (err) {
            console.error(err.message);
            console.warn(`User ${username} not found.`)
            setData(null);
          });
      }
    }, 5000);
  }

  return (
    <motion.div className="Home" transition={{ duration: 10, repeat: Infinity, repeatDelay: 0 }} animate={{ backgroundPosition: ['0%', '50%', '100%', '50%', '0%'] }}>
      <Particles url={`${Config.ASSETS_LINK}particles.json`} init={particlesInit} />
      {!!Data ?
        <motion.div transition={{ duration: 2, delay: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className='panel'  transition={{ duration: 2, delay: 1 }} animate={{ boxShadow:'0 0 1vw 0.6vw #FFFFFF' }}>
            <div className='header'>
              <motion.p transition={{ duration: 0.5, delay: 1 }} initial={{ y: '-350%' }} animate={{ y: '0%' }}>
                <motion.p transition={{ duration: 0.5 }} whileHover={{ scale: 1.1 }}>
                  <a href={`https://github.com/${username}`} target='_blank'>{username}</a>
                </motion.p>
              </motion.p>
            </div>
            <motion.div className='card_list' transition={{ duration: 2, delay: 1.5 }} initial={{ y: '350%' }} animate={{ y: '0%' }}>
              {Object.keys(Data).map((Key, Index) => (
                <motion.div className='card' transition={{ duration: 0.5 }} whileHover={{ scale: 1.05 }} viewport={{ once: false }} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
                  <a className='title' href={Data[Key].html_url} target='_blank'>{Data[Key].name}</a>
                  <div>
                    <label className='label'>Descrição:</label>
                    <span className='content'> {Data[Key].description ? Data[Key].description : 'Sem descrição.'}</span>
                    <br />
                    <label className='label'>Última Atualização:</label>
                    <span className='content'> {Data[Key].updated_at ? `${moment(Data[Key].updated_at).format('LLL')}.` : 'Sem atualizações.'}</span>
                    <br />
                    <label className='label'>Linguagem:</label>
                    <span className='content'> {Data[Key].language ? `${Data[Key].language}.` : 'Linguagem de programação não identificada.'}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
        :
        <div>
          <div className="loader">
            <motion.img src={`${Config.ASSETS_LINK}GitHubMark.png`} transition={{ duration: 1, repeat: Infinity, repeatDelay: 0 }} animate={{ scale: [0.9, 1, 0.9], opacity: [0.5, 1, 0.5] }} />
          </div>
        </div>
      }
    </motion.div>
  );
}
