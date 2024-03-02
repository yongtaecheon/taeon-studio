import React from 'react';
import styles from '../styles/about.module.scss';
import img1 from '../assets/img/me.jpg';

export default function About() {
  return (
    <div className={styles.about}>
      <h1>About</h1>
      <img className={styles.img} src={img1} alt="my img"></img>
      <div>
        <h2>Music Careers</h2>
        <p><a href="https://www.youtube.com/@tae_on">Taeon</a>&nbsp;&nbsp;
          <a href="https://www.youtube.com/@arbor_official">Arbor</a>&nbsp;&nbsp;
          <a href="https://www.youtube.com/@vieve1784">Vieve</a>&nbsp;&nbsp;
        </p>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 천용태 Yongtae Cheon - 태온 taeon</p>
        <p>Source code opens on <a className={styles.footer_a} href="https://github.com/yongtaecheon/taeon-studio">here</a></p>
        <a className={styles.footer_icon} href="https://www.youtube.com/@tae_on"><i className="bi bi-youtube"></i></a>
        <a className={styles.footer_icon} href="https://soundcloud.com/tae-on"><i className="bi bi-cloud-fill"></i></a>
        <a className={styles.footer_icon} href="https://github.com/yongtaecheon"><i className="bi bi-github"></i></a>
      </footer>
    </div>
  )
}
