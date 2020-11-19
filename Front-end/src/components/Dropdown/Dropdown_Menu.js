import React from 'react';
import './index.css';
function Dropdown_Menu(props) {
  return (
    <div>
      <div className="dropdown">
        <input type="checkbox" id="dropdown" defaultChecked={true} />

        <label className="dropdown__face" for="dropdown">
          <div className="dropdown__text">Dropdown</div>

          <div className="dropdown__arrow"></div>
        </label>

        <ul className="dropdown__items">
          <li>
            {' '}
            <div className="dropdown1">
              <input type="checkbox" id="dropdown1" defaultChecked={true} />

              <label className="dropdown__face" for="dropdown1">
                <div className="dropdown__text">🙂</div>
              </label>

              <ul className="dropdown__items">
                <div>
                  <h1>1</h1>
                  <h1>2</h1>
                  <h1>3</h1>
                  <h1>4</h1>
                </div>
              </ul>
            </div>
            <svg>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </svg>
          </li>
          <li>😺</li>
          <li>😽</li>
          <li>😎</li>
          <li>🤗</li>
        </ul>
      </div>

      <svg>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
    </div>
  );
}

export default Dropdown_Menu;
