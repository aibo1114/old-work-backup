initSelectBtnEvent = ->
  $g_select_btn = $('#g-select-btn')
  $s_select_btn = $('#s-select-btn')
  $gcbox = $('#g-cbox')
  $scbox = $('#s-cbox')
  $gbox_m = $('#gbox-main')
  $sbox_m = $('#sbox-main')
  $gbox_tit = $('#gbox-tit')
  $sbox_tit = $('#sbox-tit')
  $gbox_allgames_subbox = $('#gbox-allgames-subbox')
  $sbox_allsvrs_subbox = $('#sbox-allsvrs-subbox')
  $gbox_history_subbox = $('#gbox-history-subbox')
  $sbox_history_subbox = $('#sbox-history-subbox')
  # game select btn
  $g_select_btn.on 'click', (e) ->
    if !$gcbox.hasClass('box-coverbox-show')
      $scbox.removeClass 'box-coverbox-show'
      $gcbox.addClass 'box-coverbox-show'
    else
      $gcbox.removeClass 'box-coverbox-show'
    # auto height
    if $gbox_m.hasClass('box-covermain-slided')
      $gbox_m.css 'height', $gbox_allgames_subbox.height()
    else
      $gbox_m.css 'height', $gbox_history_subbox.height()
    $gbox_tit.find('.box-coverbox-tit-a').each ->
      $this = $(this)
      s_id = $this.attr('data-scroll')
      if s_id != undefined and s_id != ''
        $('#' + s_id).tinyscrollbar()
        $this.attr 'data-scroll', ''
      return
    t = 0
    $gcbox.on('mouseleave', ->
      clearTimeout t
      $this = $(this)
      t = setTimeout((->
        $this.removeClass 'box-coverbox-show'
        $this.off 'mouseleave'
        return
      ), 200)
      return
    ).on 'mouseenter', ->
      clearTimeout t
      return
    e.preventDefault()
    return
  # end game select btn
  # game slide title
  $gbox_tit.on 'click', '.box-coverbox-tit-a', ->
    $this = $(this)
    if $this.hasClass('box-coverbox-tit-a-select')
      return
    else
# switch tit
      $gbox_tit.find('.box-coverbox-tit-a-select').removeClass 'box-coverbox-tit-a-select'
      $this.addClass 'box-coverbox-tit-a-select'
      # animate check
      if !$gbox_m.hasClass('box-covermain-animate')
        $gbox_m.addClass 'box-covermain-animate'
      # switch main
      if $gbox_m.hasClass('box-covermain-slided')
        $gbox_m.removeClass 'box-covermain-slided'
        $gbox_m.css 'height', $gbox_history_subbox.height()
      else
        $gbox_m.addClass 'box-covermain-slided'
        $gbox_m.css 'height', $gbox_allgames_subbox.height()
    return
  # end game slide title
  # server select button
  $s_select_btn.on 'click', (e) ->
    webgame_id = $g_select_btn.attr('data-gid')
    if webgame_id == undefined or webgame_id == ''
      #util.scroll2top()
      $g_select_btn.ktip '<span class="red">请先选择需要充值的游戏</span>',
        direction: 'left'
        offset: 18
        atX: -5
        atY: 19
        closeBtn: false
        stick: 2000
      return
    if !$scbox.hasClass('box-coverbox-show')
      $gcbox.removeClass 'box-coverbox-show'
      $scbox.addClass 'box-coverbox-show'
    else
      $scbox.removeClass 'box-coverbox-show'
    # switch main
    if $sbox_m.hasClass('box-covermain-slided')
      $sbox_m.css 'height', $sbox_allsvrs_subbox.height()
    else
      $sbox_m.css 'height', $sbox_history_subbox.height()
    $sbox_tit.find('.box-coverbox-tit-a').each ->
      $this = $(this)
      s_id = $this.attr('data-scroll')
      if s_id != undefined and s_id != ''
        $('#' + s_id).tinyscrollbar()
        $this.attr 'data-scroll', ''
      return
    t = 0
    $scbox.on('mouseleave', ->
      clearTimeout t
      $this = $(this)
      t = setTimeout((->
        $this.removeClass 'box-coverbox-show'
        $this.off 'mouseleave'
        return
      ), 200)
      return
    ).on 'mouseenter', ->
      clearTimeout t
      return
    return
  # end server select button
  # server slide title
  $sbox_tit.on 'click', '.box-coverbox-tit-a', ->
    $this = $(this)
    if $this.hasClass('box-coverbox-tit-a-select')
      return
    else
# switch tit
      $sbox_tit.find('.box-coverbox-tit-a-select').removeClass 'box-coverbox-tit-a-select'
      $this.addClass 'box-coverbox-tit-a-select'
      # animate check
      if !$sbox_m.hasClass('box-covermain-animate')
        $sbox_m.addClass 'box-covermain-animate'
      # switch main
      if $sbox_m.hasClass('box-covermain-slided')
        $sbox_m.removeClass 'box-covermain-slided'
        $sbox_m.css 'height', $sbox_history_subbox.height()
      else
        $sbox_m.addClass 'box-covermain-slided'
        $sbox_m.css 'height', $sbox_allsvrs_subbox.height()
    return
  # end server slide title
  # game button
  $gbox_m.on 'click', '.box-coverbox-list-a', (e) ->
    e.preventDefault()
    id = $(this).attr('data-id')
    all_games = games
    try
      gid = all_games[id].webgame_id
      $g_select_btn.attr('data-gid', gid).html all_games[id].name
      $gcbox.removeClass 'box-coverbox-show'
      gameinfo['g'] = gid
      refreshSidSelectBtn()
    catch e
    return
  # end game button
  # server button
  $sbox_m.on 'click', '.box-coverbox-list-a', ->
    $this = $(this)
    sid = $this.attr('data-sid')
    $s_select_btn.attr('data-sid', sid).html $this.html()
    $scbox.removeClass 'box-coverbox-show'
    gameinfo['s'] = sid
    return
  # end server button
  return

# ---
# generated by js2coffee 2.2.0