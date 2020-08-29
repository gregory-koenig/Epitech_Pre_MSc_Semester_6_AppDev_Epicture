const API_TOKEN = 'e42d5f14de4e8d0';
const ACCESS_TOKEN = '1137fbd88130c70b745869d0d3d03f939c058bf7';
const USERNAME = 'greg67';

export function getImageFromApiWithSearchedText(text, page, profile) {
  const url = 'https://api.imgur.com/3/gallery/search/time/' + page + '?q=' + text;

  const myInit = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + profile['access_token'],
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  return fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getHotGalleriesFromApi(page = 0, profile) {
  const url = 'https://api.imgur.com/3/gallery/hot/' + page;

  const myInit = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + profile['access_token'],
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  return fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getFavoritesFromApi(page = 0, profile) {

  const url = 'https://api.imgur.com/3/account/' + profile['account_username'] + '/gallery_favorites/' + page;

  const myInit = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + profile['access_token'],
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  return fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getAcountFromApiWithAccountUrl(account_url) {
  const url = 'https://api.imgur.com/3/account/' + account_url;

  const myInit = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Client-ID ' + API_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  return fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function postVoteGallery(gallery_id, vote = 'veto', profile) {
  const url = 'https://api.imgur.com/3/gallery/' + gallery_id + '/vote/' + vote;

  const myInit = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + profile['access_token'],
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function postFavoriteGallery(gallery_id, profile) {
  const url = 'https://api.imgur.com/3/album/' + gallery_id + '/favorite';

  const myInit = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + profile['access_token'],
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getCommentsFromGallery(gallery_id, profile) {
  const url = 'https://api.imgur.com/3/gallery/' + gallery_id + '/comments/';

  const myInit = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + profile['access_token'],
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  return fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function postImage(image, profile) {
  const url = 'https://api.imgur.com/3/image';

  const myInit = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + profile['access_token'],
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: image,
  };

  return fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getAccountImage(page, profile) {
  const url = 'https://api.imgur.com/3/account/me/images/' + page;

  const myInit = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + profile['access_token'],
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  return fetch(url, myInit)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
