import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Component, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';


// Post
export function Post({ author, publishedAt, content }) {
  
// State Post
const [comments, setComments] = useState([
  'Post muito bacana, hein?'
])

//State New Comment
const [newCommentText, setNewCommentText] = useState('')
console.log(newCommentText);

const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
  locale:ptBR,
});

const publishedDateRelativeToNow =  formatDistanceToNow(publishedAt, {
  locale: ptBR,
  addSuffix: true,
})


// New Comment FUNCTION
function handleNewCommentChange(e){
  setNewCommentText(e.target.value);
  e.target.setCustomValidity('');
}

// Create Comment FUNCTION
function handleCreateNewComment(e){
  e.preventDefault();
  setComments([...comments, newCommentText ]);
  setNewCommentText('');
}

//Delete Comments FUNCTION
function deleteComment(commentToDelete){
  const commentsWithoutDeletedOne = comments.filter(comment => {
  return comment != commentToDelete
})

  setComments(commentsWithoutDeletedOne);
}

//Handle Invalid Comment FuNCTION
function handleNewCommentInvalid(e){
  e.target.setCustomValidity = 'Esse campo é obrigatório'
}

// Empty Comment Variable
const isNewCommentEmpty = newCommentText === '';

// HTML
return (
    <article className={styles.post}>
    <header>
        <div className={styles.author}>
            <Avatar className={styles.avatar} src={ author.avatarUrl } alt="" />
            <div className={styles.authorInfo}>
              <strong>{ author.name }</strong>
              <span>{ author.role }</span>
            </div>
        </div>

        <time title= { publishedDateFormatted } dateTime= { publishedAt.toISOString() }>{ publishedDateRelativeToNow }</time>
    </header>

    <div className={styles.content}>
      {
        content.map(line =>{
          if(line.type === 'paragraph'){
          return <p>{line.content}</p>
          } else if(line.type ==='link'){
          return <p><a href="">{line.content}</a></p>
          }
        })
      }
        {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <p> Vitae recusandae maxime corrupti asperiores nesciunt, perspiciatis officia sapiente? Nostrum obcaecati </p>
        <p><a href="www.clubedoscompositores.com.br">www.clubedoscompositores.com.br</a></p> */}
    </div>

    {/* Textarea */}
    <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
      <strong>Deixe seu feedback</strong>
      <textarea 
        name="comment"
        placeholder='Deixe um comentário'
        onChange={handleNewCommentChange}
        value={newCommentText}
        required
        onInvalid={handleNewCommentInvalid}
      />
      <footer>
        <button type='submit' disabled={isNewCommentEmpty}>
          Publicar
        </button>
      </footer>
    </form>

    {/* Comments */}
    <div className={styles.commentList}>
      {comments.map(comment =>{
      return <Comment onDeleteComment={deleteComment} content={comment}/>
      })}
    </div>
    </article> 
)
}