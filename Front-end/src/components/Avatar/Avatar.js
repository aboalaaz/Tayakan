// import img from '../../assets/img/sections/pexels-startup-stock-photos-7102.jpg';
import { useSelector, useStore } from 'react-redux';
import axios from 'axios';
import React from 'react';
import './_Cards.css';

// creating the shape
var rotation = 0;

function create() {
  rotation += 40;
  var b = document.querySelector('#blob');
  var image = document.querySelector('#image');
  var r1 = random(25, 75);
  var r2 = random(25, 75);
  var r3 = random(25, 75);
  var r4 = random(25, 75);

  var r11 = remain(r1);
  var r22 = remain(r2);
  var r33 = remain(r3);
  var r44 = remain(r4);

  var coordinates = `${r1}% ${r11}% ${r22}% ${r2}% / ${r3}% ${r4}% ${r44}% ${r33}%`;
  b.style['border-radius'] = coordinates;

  b.style['transform'] = 'rotate(' + rotation + 'deg)';

  image.style.setProperty('--r', -rotation + 'deg');
}

function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function remain(n) {
  return 100 - n;
}

function Avatar(props) {
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    create();
  }, []);
  return (
    <div id="blob" style={{ width: props.bw, height: props.bh }}>
      <div
        id="image"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundSize: 'cover',
          width: props.iw,
          height: props.ih,
        }}
      ></div>
    </div>
  );
}

export default Avatar;
