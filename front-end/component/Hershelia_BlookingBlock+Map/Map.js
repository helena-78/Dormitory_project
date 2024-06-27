// components/Map.js

import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{width: '95%', height: '600px'}}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.4709113265967!2d35.05468097631596!3d48.44749357127936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe32b9826de01%3A0xe8fa0e63a0533b14!2z0L_RgNC-0YHQvy4g0JPQsNCz0LDRgNC40L3QsCwgNTcsINCU0L3QtdC_0YAsINCU0L3QtdC_0YDQvtC_0LXRgtGA0L7QstGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCDQo9C60YDQsNC40L3QsCwgNDkwMDA!5e0!3m2!1sru!2spl!4v1718560223783!5m2!1sru!2spl"
        style={{ border: 0,width : '100%', height: '100%'}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
