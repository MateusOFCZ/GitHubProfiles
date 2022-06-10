import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import Config from '../../assets/config.json';
import Particles from 'react-tsparticles';
import { tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { useParams } from "react-router-dom";
import './styles.css';

export default function Home() {
  let { username } = useParams();
  if (!username) {
    username = Config.GITHUB_USERNAME;
  }
  
  const [Data, setData] = useState();

  const particlesInit = async (main) => {
    await loadFull(tsParticles);
  };

  if (!Data) {
    axios.get(`https://api.github.com/users/${username}/repos?type=owner&sort=updated`)
      .then(function (response) {
        setData(response.data);
      });
  }

  return (
    <div className="Home">
      {!!Data ?
        <div>
          <Particles url={`${Config.HOMEPAGE}assets/particles.json`} init={particlesInit} />
          <div className='panel'>
            <div className='header'>
              <a href={`https://github.com/${username}`} target='_blank'>{username}</a>
            </div>
            <div className='card_list'>
              {Object.keys(Data).map((Key, Index) => (
                <div className='card'>
                  <a className='title' href={Data[Key].html_url} target='_blank'>{Data[Key].name}</a>
                  <div>
                    <label className='label'>Descrição:</label>
                    <span className='content'> {Data[Key].description ? Data[Key].description : 'Sem descrição.'}</span>
                    <br/>
                    <label className='label'>Última Atualização:</label>
                    <span className='content'> {Data[Key].updated_at ? `${moment(Data[Key].updated_at).format('LLL')}.` : 'Sem atualizações.'}</span>
                    <br/>
                    <label className='label'>Linguagem:</label>
                    <span className='content'> {Data[Key].language ? `${Data[Key].language}.` : 'Linguagem de programação não identificada.'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        :
        <div>
          <div className="loader">
            <img src={`${Config.HOMEPAGE}assets/GitHubMark.png`}></img>
          </div>
        </div>
      }
    </div>
  );
}
