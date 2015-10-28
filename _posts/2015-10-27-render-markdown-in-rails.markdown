---
layout: post
title:  "Отрисовка markdown в Rails"
date:   2015-10-27 22:12:11
categories: rails markdown redcarpet
---

Однажды мне понадобилось отрисовывать шаблоны формата `.md` в рельсовом приложении.
Требовалось сделать так, чтобы можно было написать `render 'partial_with_markdown'`
и все сразу работало (автовставка содержания, поддержка [GFM](https://help.github.com/articles/github-flavored-markdown/)
и подсветка кода).

В статье пошагово будет построено Rails приложение, которое отрисовывать подобные
шаблоны.

#### Создаем новое приложение

```sh
rails new markdown_renderer -T -B # приложение без test-unit и без выполнения bundle
cd markdown_renderer
```

#### Добавляем в `Gemfile` следующие гемы:

```ruby
gem 'markdown-rails'
gem 'redcarpet'
gem 'pygments.rb'
```

Гем [markdown-rails](https://github.com/joliss/markdown-rails) позволяет отрисовывать
статические шаблоны формата `.md`

Гемом [redcarpet](https://github.com/vmg/redcarpet) мы заменим парсер по умолчанию у 
`markdown-rails`, который называется [RDiscount](https://github.com/rtomayko/rdiscount).
Преимуществом `redcarpet` является поддержка
[Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)
и относительная легкость автоматического создания содержания.

[pygments.rb](https://github.com/tmm1/pygments.rb) понадобится для подсветки кода.
Этот гем требует наличия в системе версии Python 2.x (Python 2.5, Python 2.6 или 
Python 2.7)

#### Создадим новый initializer

```ruby
# config/initializers/markdown.rb
class PygmentsHTML < Redcarpet::Render::HTML
  def block_code(code, language)
    # setting Pygmens as syntax highlighter
    Pygments.highlight code, lexer: language
  end
end

MarkdownRails.configure do |config|
  config.render do |markdown_source|
    markdown = Redcarpet::Markdown.new(PygmentsHTML.new(with_toc_data: true),
      tables: true,
      fenced_code_blocks: true,
      autolink: true
    )
    # first, render table of contents
    html_toc = Redcarpet::Markdown.new(Redcarpet::Render::HTML_TOC)
    toc = html_toc.render(markdown_source)
    # then render actual html
    html = markdown.render markdown_source
    toc + html
  end
end
```

К сожалению, каждый `.md` файл будет прорисован два раза: в первый раз для создания
содержания, второй раз уже будет построено само содержимое.

#### Последние штрихи

Осталось только добавить стили. Попробуем стилизовать markdown под гитхаб. 

Во-первых, нам понадобятся стили для подсветки `markdown`: 
[github-markdown.css](https://github.com/sindresorhus/github-markdown-css/blob/gh-pages/github-markdown.css)
(возьмем из репозитория [sindresorhus](https://github.com/sindresorhus/github-markdown-css)). Сохраним файл в 
`app/assets/stylesheets/github-markdown.css`

Во-вторых, скачаем подсветку синтаксиса [pygments.css](/public/2015-10-27-render-markdown-in-rails/pygments.css),
которая более-менее похожа на подсветку от Github. Положим файл в `app/assets/stylesheets/pygments.css`

В-третьих, стилизуем нашу страницу, добавив границы и центрировав ее.

Вот так должен выглядеть `app/assets/stylesheets/application.css` файл:

```css
#= require pygments
#= require github-markdown

.markdown-body {
  min-width: 200px;
  max-width: 790px;
  margin: 0 auto;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 3px;
  border: 1px solid #ddd;
}
```

#### Подготовка 

```ruby
config/routes.rb

Rails.application.routes.draw do
  root to: "application#index"
end
```

`app/views/application/index.html.erb`

```erb
<article class="markdown-body">
  <%= render partial: 'markdown_partial' %>
</article>
```

`app/views/application/_markdown_partial.md`

    __Hello world__
    ```
    This is a code
    ```


#### Результат:


