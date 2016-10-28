interface UIComponent {
  title: string,
  open: boolean
};

export interface UI {
  components: {
    works: {
      open: boolean;
    };
    texts: {
      open: boolean;
    };
  }
}
