type Listener = (selectedValue: any) => void;

class SearchSelectorListener {
  private static listeners: Listener[] = [];

  static subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  static emit(person: any) {
    this.listeners.forEach(l => l(person));
  }
}

export default SearchSelectorListener;
