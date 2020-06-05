import React from 'react';
import styles from "./Error.module.css";

export default function Error(props) {

 return (
  <div className={styles.error}>
    <p className={styles.errorTag}>{props.error}</p>
  </div>
 )
}
