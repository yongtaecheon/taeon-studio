import React from 'react';
import styles from '../styles/about.module.scss';
import img1 from '../assets/img/me.jpg';

export default function About() {
  return (
    <div className={styles.about}>
      <h1>About</h1>
      <img className={styles.img} src={img1} alt="my img"></img>
      <div className={styles.content}>
        <h1>Music Careers</h1>
        <p className={styles.link}>
          <a href="https://www.youtube.com/@tae_on">Taeon</a><br />
          <iframe className={styles.iframe} src="https://www.youtube.com/embed/r0qoxzJckIU?si=k2ouGd2FOhYBX4Oa" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe><br/>
          <a href="https://www.youtube.com/@arbor_official">Arbor</a><br />
          <iframe className={styles.iframe} src="https://www.youtube.com/embed/-AOLwjv9uD0?si=xcawa0hKZh0tbALB" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe><br/>
          <a href="https://www.youtube.com/@vieve1784">Vieve</a><br/>
          <iframe className={styles.iframe} src="https://www.youtube.com/embed/95arMZc3OLU?si=ox9yq9n1_zWyHSbB" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </p>
        <h1>Gears</h1>
        <p>
          <strong>· DAW:</strong><br/>
          - Logic Pro X<br />
          <strong>· Guitar:</strong><br />
          - Fender Japan 72 Stratocaster<br />
          - Fender Japan 62 Telecaster<br />
          - Epiphone by Gibson ES-335<br />
          <strong>· Effects:</strong><br />
          - Digitech Whammy 5<br />
          - Fulltone OCD<br />
          - Strymon Riverside<br />
          - UAFX Dream 65<br />
          - Walrus Audio Julia<br />
          - Walrus Audio ARP-87<br />
          - Strymon Bluesky<br />
          - Strymon Ojai<br />
          <strong>· Audio Interface:</strong><br/>
          - SSL 2<br />
          <strong>· Recording Gears:</strong><br/>
          - Shure SM 57<br />
          - Shure SRH 440<br />
        </p>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 천용태 Yongtae Cheon - 태온 taeon</p>
        <p>Page source code opens on <a className={styles.footer_a} href="https://github.com/yongtaecheon/taeon-studio">here</a></p>
        <a className={styles.footer_icon} href="https://www.youtube.com/@tae_on"><i className="bi bi-youtube"></i></a>
        <a className={styles.footer_icon} href="https://soundcloud.com/tae-on"><i className="bi bi-cloud-fill"></i></a>
        <a className={styles.footer_icon} href="https://github.com/yongtaecheon"><i className="bi bi-github"></i></a>
      </footer>
    </div>
  )
}
