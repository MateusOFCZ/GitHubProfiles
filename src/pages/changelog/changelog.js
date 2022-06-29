import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import Config from '../../assets/config.json';
import { useParams } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import ChangelogData from '../../assets/changelog.json';

export default function Home(props) {
    return (
        <motion.div animate={props.ChangelogControls}>
            <motion.div className="Changelog" transition={{ duration: 2 }} initial={{ x: '200%', opacity: 0 }} animate={{ x: '0%', opacity: 1 }}>
                <motion.div className='changelog_page' onClick={(e) => props.ChangePage('/')} transition={{ duration: 1, delay: 2 }} initial={{ x: '-110%', opacity: 0 }} animate={{ opacity: 1, x: '0%' }}>
                    <FontAwesomeIcon icon={faArrowLeft} className='icon' /> <span className='text'>Back</span>
                </motion.div>
                <motion.div transition={{ duration: 2, delay: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div className='panel' transition={{ duration: 10, repeat: Infinity, repeatDelay: 0 }} animate={{ boxShadow: ['0 0 1vw 0.1vw #FFFFFF', '0 0 1vw 0.6vw #FFFFFF', '0 0 1vw 0.1vw #FFFFFF'] }}>
                        <div className='header'>
                            <motion.div transition={{ duration: 0.5, delay: 1.5 }} initial={{ y: '-350%' }} animate={{ y: '0%' }}>
                                <span className='title'>Changelog</span>
                            </motion.div>
                        </div>
                        <motion.div className='changelog_list' transition={{ duration: 2, delay: 1.5 }} initial={{ y: '350%' }} animate={{ y: '0%' }}>
                            {Object.keys(ChangelogData).map((Key, Index) => (
                                <motion.div key={Index} className='card' transition={{ duration: 0.5 }} whileHover={{ scale: 1.05 }} viewport={{ once: false }} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
                                    <a className='title' dangerouslySetInnerHTML={{ __html: (ChangelogData[Key].title ? ChangelogData[Key].title : 'Without Title') + (ChangelogData[Key].date ? ' | ' + ChangelogData[Key].date : '') }}></a>
                                    <div>
                                        <span className='content' dangerouslySetInnerHTML={{ __html: ChangelogData[Key].description ? ChangelogData[Key].description : 'Without informations.' }}></span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}