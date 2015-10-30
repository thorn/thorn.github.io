---
layout: post
title:  "Markdown в Rails"
date:   2015-10-27 22:12:11
categories: rails markdown redcarpet
---

Хотите отображать **markdown** в рельсовом проекте, как на странице Github?

В статье будет пошагово построено Rails приложение, которое будет отрисовывать шаблоны в markdown с помощью простого `render 'readme'`.

Конечный результат:

![Конечный результат](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Markdown шаблон с содержанием и кодом")

[Репозиторий](https://github.com/thorn/markdown_example) на Github.

Фичи приложения:

- Поддержка [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)
- Подсветка кода с помощью `Pygments`
- Автоматическая вставка сожержания

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
[GFM](https://help.github.com/articles/github-flavored-markdown/)
и относительная легкость автоматического создания содержания.

[pygments.rb](https://github.com/tmm1/pygments.rb) понадобится для подсветки кода.
Этот гем требует наличия в системе версии Python 2.x (Python 2.5, Python 2.6 или 
Python 2.7)

Не забываем выполнить команду `bundle` в папке с проектом!

#### Создаем новый initializer

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

К сожалению, каждый `.md` файл будет прорисован два раза: в первый раз для создания содержания, второй раз уже будет скомпилирован сам документ.

#### Последние штрихи

Осталось только добавить стили. Попробуем стилизовать markdown под гитхаб.

Во-первых, нам понадобятся стили для подсветки `markdown`: 
[github-markdown.css](https://github.com/sindresorhus/github-markdown-css/blob/gh-pages/github-markdown.css)
(возьмем из репозитория [sindresorhus](https://github.com/sindresorhus/github-markdown-css)). Сохраним файл в 
`app/assets/stylesheets/github-markdown.css`

Во-вторых, скачаем подсветку синтаксиса [pygments.css](/public/2015-10-27-render-markdown-in-rails/pygments.css),
которая более-менее похожа на подсветку от Github. Положим файл в `app/assets/stylesheets/pygments.css`

В-третьих, стилизуем нашу страницу, добавив границы и центрировав ее.

```css
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

Вот так должен выглядеть `app/assets/stylesheets/application.css` файл:

```css
*= require pygments
*= require github-markdown

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

#### Собственно приложение

Создадим простейший маршрут в `config/routes.rb`

```ruby
# config/routes.rb

Rails.application.routes.draw do
  root to: "application#index"
end
```


В соответствующем виде `app/views/application/index.html.erb` добавим обертку `.markdown-body` и вызовем рендер нашего шаблона

```erb
<article class="markdown-body">
  <%= render partial: 'documentation' %>
</article>
```

Собственно шаблон с документацией 

`app/views/application/_documentation.md`

    # Документация по API

    > Составитель: [Me](mailto:me@example.com)

    Документ описывает API моего мега полезного сервиса

    # Пользователи

    ## Получение списка пользователей

    __URL:__ (GET)

    ```
    /users
    ```

    __Параметры:__

    ```
    Нет
    ```

    *Удачный ответ:*

    ```
    HTTP 200 Ok
    [
      {
        "email": "ivan@example.com",
        "first_name": "Ivan",
        "last_name": "Ivanov"
      },
      ...
    ]
    ```

    *Неудачный ответ:*

    ```
    HTTP 404 Not Found
    ```

    ## Получение подробной информации о пользователе

    __URL:__ (GET)

    ```
    /users/:id
    ```

    ```
    :id - ID пользователя
    ```

    __Параметры:__

    ```
    Нет
    ```

    *Удачный ответ:*

    ```
    HTTP 200 Ok
    {
      "email": "ivan@example.com",
      "first_name": "Ivan",
      "last_name": "Ivanov"
    }
    ```

    *Неудачный ответ:*

    ```
    HTTP 404 Not Found
    ```

#### Результат:

Запустим сервер с помощью `rails s` и перейдем по адресу [http://localhost:3000](http://localhost:3000), чтобы посмотреть на нашу красивую документацию:


![Конечный результат](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Markdown шаблон с содержанием и кодом")


### Заключение

В результате у нас получилось приложение, которым удобно прорисовывать статическе шаблоны в формата `.md`.

### Дополнительные ссылки

- [Markdown и подсветка синтаксиса в Ruby On Rails](http://www.unix-lab.org/posts/rails-markdown/) - в статье описан похожий способ рендеринга markdown из базы
- [Kramdown](http://kramdown.gettalong.org/converter/html.html#toc) - аналог redcarpet, в нем есть тег для автоматической вставки содержания, но также присутствуют некоторые проблемы с использованием сторонних подсветок кода
