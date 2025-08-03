'use client'
import {useEffect, useState} from "react";

export default ()=>{
  const [isServer,setServer] = useState(true);
  useEffect(setServer,[]);

  return (
      <p className={"client-component"}>
        This content is generated client-side. Datestamp: {isServer ? '' : Date.now()}
      </p>
  );
}
