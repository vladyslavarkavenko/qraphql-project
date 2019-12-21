// TODO: Use Redis for this
class Queue {
  constructor() {
    this.state = [];
  }

  get() {
    return this.state;
  }

  add({ searcher, search }) {
    this.state.push({ searcher, search });
  }

  findMatchAndDelete({ searcher, search }) {
    let removeIndex;

    const match = this.state.find(({ searcher: qSearcher, search: qSearch }, i) => {
      const isMatch = (
        (searcher.id !== qSearcher.id)
            && (!search.sex || search.sex === qSearcher.sex)
            && (!qSearch.sex || qSearch.sex === searcher.sex)
            && (!search.maxAge || search.maxAge >= qSearcher.age)
            && (!search.minAge || search.minAge <= qSearcher.age)
            && (!qSearch.minAge || qSearch.minAge <= searcher.age)
            && (!qSearch.maxAge || qSearch.maxAge >= searcher.age)
      );

      if (isMatch) {
        removeIndex = i;
      }

      return isMatch;
    });

    if (removeIndex !== undefined) {
      this.state.splice(removeIndex, 1);
    }

    return match;
  }
}

const queue = new Queue();
export default queue;
