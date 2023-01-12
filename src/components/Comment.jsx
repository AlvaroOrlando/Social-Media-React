import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';

export function Comment({content}){
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/92760374?v=4" alt="" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                  <header>
                     <div className={styles.authorAndTime}>
                        <strong>Álvaro Orlando</strong>
                         <small> 
                          <time title="11 de maio às 08:13:00" dateTime="2022-05-11 08:13:00">Cerca de 1h atrás</time>
                         </small> 
                     </div>
                     <button title="Deletar comentário">
                        <Trash size={24} />
                     </button>
                  </header>
                  <p>
                   { content }
                  </p>
                </div>
                <footer>
                  <button>
                    <ThumbsUp />
                    Aplaudir <span>20</span>
                  </button>
                </footer>
            </div>
        </div>
    )
}