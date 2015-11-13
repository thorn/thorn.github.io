---
layout: post
title:  "Что нового в Ruby 2.3.0-preview1"
date:   2015-11-12 22:00:00
categories: ruby 2.3.0
---

Вышла preview версия нового Ruby 2.3.0.

## Установка

С помощью [rvm](https://rvm.io):

```shell
$ rvm install 2.3.0-preview1
```

C помощью [rbenv](https://github.com/sstephenson/rbenv):

```shell
$ rbenv install 2.3.0-preview1
```

## Заметные изменения:

### Работа с "замороженными" строками

[Новый волшебный комментарий](https://bugs.ruby-lang.org/issues/11473), "замораживающий" все строковые литералы в файле. В Ruby 2.1 `"str".freeze` был оптимизирован для уменьшения количества создаваемых объектов. Ruby 2.3 вводит новый магический комментарий и опцию командной строки, замораживающей все строковые литералы в файле. Дополнительно, для отладки, можно получить место создания объекта, который выдает ошибку `"can’t modify frozen String"` с помощью опции `–enable-frozen-string-literal-debug`.

Комментарии по использованию можно посмотреть [здесь](https://github.com/ruby/ruby/blob/v2_3_0_preview1/ChangeLog#L2308)

Новая опция компилятора:

```ruby
RubyVM::InstructionSequence.compile_option =
  {frozen_string_literal: true}
```

### Новый оператор `&.`

[Оператор безопасной навигации](https://bugs.ruby-lang.org/issues/11537), существующий в C#, Groovy и Swift, теперь доступен и в Ruby. Он упростит обработку `nil` с помощью `obj&.foo`.

```ruby
# Было:
if a && a.b && a.b.c
  # your code goes here
end

# Стало:
if a&.b&.c
  # your code goes here
end
```

### Array#dig и Hash#dig`
Добавлены методы [Array#dig](https://bugs.ruby-lang.org/issues/11643) и [Hash#dig](https://bugs.ruby-lang.org/issues/11643).

```ruby
# Ruby MRI 2.3.0-preview1
{ a: { b: :c} }.dig(:a, :b)
 => :c 

[[:a, :b], [:c, :d]].dig(1,0)
 => :c 
```

### Гем did\_you\_mean 

[Встроен](https://bugs.ruby-lang.org/issues/11252) гем [did\_you\_mean](https://github.com/yuki24/did_you_mean) в `ruby-core`.

```ruby
class User
  attr_accessor :first_name, :last_name

  def to_s
    "#{f1rst_name} #{last_name}" # f1rst_name ???
  end
end

user.to_s
# => NameError: undefined local variable or method `f1rst_name' for #<User:0x0000000928fad8>
#
#     Did you mean? #first_name
#
```

### Сравнение хешей

Сделано вменяемое [сравнение хешей](http://olivierlacan.com/posts/hash-comparison-in-ruby-2-3/?utm_source=rubyweekly&utm_medium=email)

```ruby
# Ruby MRI 2.2 and earlier
{ a: 1, b: 2 }.include?({ a: 1 })
=> false

# Ruby MRI 2.3.0-preview1
{ a: 1, b: 2 }.include?({ a: 1 })
=> false
```

Новые, более последовательные правила сравнения хешей:

```ruby
{ a: 1 } <= { a: 1 } = true
{ a: 1 } <= { a: 2 } = false
{ a: 2 } <= { a: 1 } = false
{ a: 2 } <= { a: 2 } = true
{ a: 1 } >= { a: 1 } = true
{ a: 1 } >= { a: 2 } = false
{ a: 2 } >= { a: 1 } = false
{ a: 2 } >= { a: 2 } = true
{ a: 1 } <  { a: 1 } = false
{ a: 1 } <  { a: 2 } = false
{ a: 2 } <  { a: 1 } = false
{ a: 2 } <  { a: 2 } = false
{ a: 1 } >  { a: 1 } = false
{ a: 1 } >  { a: 2 } = false
{ a: 2 } >  { a: 1 } = false
{ a: 2 } >  { a: 2 } = false
{ a: 1 } == { a: 1 } = true
{ a: 1 } == { a: 2 } = false
```


Материалы:

* [Новость](https://www.ruby-lang.org/en/news/2015/11/11/ruby-2-3-0-preview1-released/) на официальном сайте
* [Changelog](https://raw.githubusercontent.com/ruby/ruby/v2_3_0_preview1/ChangeLog)
* [Статья про сравнение хешей](http://olivierlacan.com/posts/hash-comparison-in-ruby-2-3/)
