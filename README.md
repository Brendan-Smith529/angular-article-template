# Article Template for Angular
This project is intended to provide a base for any site that may require manuals or other types of documentation.
It allows users a clean, intuitive, and feature rich way to traverse various articles/manuals without becoming frustrated or wishing for a better UI.

Try out a demo [Here](https://angular-manual-template.vercel.app/)!

## Local Setup

#### Clone the repository:

```bash
git clone https://github.com/Brendan-Smith529/angular-article-template.git
```

or

```bash
git clone git@github.com:Brendan-Smith529/angular-article-template.git
```

#### Download the necessary packages:

```bash
npm install
```

#### Run the server:

```bash
ng serve
```

Once the server is running, open your browser and navigate to
`http://localhost:4200/` or click [Here](http://localhost:4200/).

## Features

### Theming

To make first time viewers more comfortable, there is custom theme selection which
defaults to the browser's current theme. For example, if the browser is
in dark mode then the page will load in dark mode; the same applies for light mode.

Manual theming is another option and is made easy by a selector at the top of the
screen labeled 'Theme'. Clicking opens a drop-down menu which makes it clear which
option is currently selected along with providing icons and clear labels as to
the options. The currently, selected option has a different background color from
the other options and a shadow more extra emphasis.

### Intuitive Home Page

The home page provides an easy to understand list of available articles.
Each article has a preview (designated by the article contents) where users
are able to see what the article is about.

Article selection is designed to be simple. Underlining the article title
and adding a strong shadow to the box ensures that there is no confusion as
to which box could be selected, while also creating a more pleasant experience.

### Article's Header Sidebar

There is a sidebar dedicated to all of the headers present in the article.

The section currently being viewed has its header highlighted on sidebar.
If there are many headers, the highlighted header will be
scrolled into view, assuming it is not there already.

Clicking on one of the headers smoothly scrolls the selected article section to
the top of the viewport.

### Article Sidebar

To provide a better experience, there is a sidebar dedicated all of the available
articles. Clicking on these articles will change the user to whichever article was
selected.

### Article Content

In the content of the articles themselves, the headers are able to be clicked and
behave the same as clicking a header on the sidebar: scrolling the header to the top
of the viewport. There is also smooth scrolling to the section on popstates, 
using a back/forward arrow of the browser, to make a better and more obvious
transition.
