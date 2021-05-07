import { ajax } from 'rxjs/ajax';
import { pluck, map, concatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import renderPosts from './renderPosts';

const container = document.querySelector('.container');// создаём основной контейнер
const url = 'http://localhost:7070/posts/latest';//
const request$ = ajax.getJSON(url);// создаём поток с запросом для получения постов

request$.pipe(
  pluck('posts'), // вылавливаем в потоке по ключу массив с постами
  concatMap((posts) => { // последовательно переключаем поток
    const comments$ = posts.map((post) => ajax.getJSON(`http://localhost:7070/posts/${post.id}/comments/latest`).pipe(// создаём новый потом для получения коментариев к определённому посту
      pluck('comments'), // вылавливаем в потоке по ключу массив с коментариями
      map((comments) => {
        const postsWithComments = {};// создаём объект с постом и коментариями к нему
        postsWithComments.post = post;
        postsWithComments.comments = comments;
        return postsWithComments;
      }),
    ));
    return forkJoin(comments$);// запускам одновременно все запросы для получения комментариев
  }),
).subscribe((value) => {
  console.log(value);
  renderPosts(container, value);// отрисовываем посты с комментариями
});
