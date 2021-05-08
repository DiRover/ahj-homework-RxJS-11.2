import moment from 'moment';
import faker from 'faker';

faker.locale = 'fi';
// простой код для отрисовки элементов, jsonplaceholder дурацкая библиотека, пришлось дополнительно использовать faker
export default function renderPosts(parent, postsWithComments) {
  postsWithComments.forEach((item) => {
    console.log(item);
    const elem = document.createElement('div');
    elem.setAttribute('class', 'box');
    const timestamp = new Date();
    const time = moment(timestamp).format('hh:mm DD.MM.YYYY');
    elem.innerHTML = `
        <p class='poster'>${faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')}</p>
        <p class='poster-time'>${time}</p>
        <p class='poster-text'>${item.post.title}</p>
        <p class='comments-title'>Latest comments:</p>`;
    item.comments.forEach((i) => {
      elem.innerHTML += `
            <div class='comment'>
                <div class='comment-body'>
                    <p>${faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')}</p>
                    <p>${i.body}</p>
                </div>
                <div class='comment-time'>${time}</div>
            </div>
            `;
    });
    parent.append(elem);
  });
}
