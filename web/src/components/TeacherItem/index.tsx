import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://yt3.ggpht.com/a-/AOh14GiIpBRVpor8yM3gSm7DmePa52KwtuhQUHbQtc3dtQ=s88-c-k-c0xffffffff-no-rj-mo" alt="Petherson Moreno" />
        <div>
          <strong>Petherson Moreno</strong>
          <span>Química</span>
        </div>
      </header>
      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br /><br />
        Apaixonado por explodir coisas em laborátorio e por mudar a vida das pessoas através de experiências.
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
