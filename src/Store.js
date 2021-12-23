export default class Store {
  cached;

  constructor(key) {
    this.key = key;
  }

  load() {
    const todos =
      this.cached || JSON.parse(localStorage.getItem(this.key)) || [];

    return [...todos];
  }

  save(todos) {
    this._cache(todos);
    localStorage.setItem(this.key, JSON.stringify(this.cached));
  }

  _cache(todos) {
    this.cached = [...todos];
  }
}
