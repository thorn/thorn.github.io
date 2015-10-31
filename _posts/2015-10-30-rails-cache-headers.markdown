---
layout: post
title:  "Принудительное отключение кеширование в браузере для Rails"
date:   2015-11-01 22:00:00
categories: rails cache no-cache
---

Чтобы стопроцентно отключить кеш браузера, например для сокрытия какой-нибудь приватной информации или для обеспечения свежести данных, возвращаемых API, нужно установить соответствующие заголовки в контроллере.

```ruby
class SomeSensitiveController < ApplicationController

  before_action :set_no_cache_headers

  private

  def set_no_cache_headers
    response.headers['Cache-Control'] = 'no-cache, no-store, max-age=0, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = 'Fri, 01 Jan 1990 00:00:00 GMT'
  end
end
```
