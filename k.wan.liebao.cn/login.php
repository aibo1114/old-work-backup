<!-- 登录&注册 -->
<?php var_dump($_SESSION);?>
<div class="part">
	<div class="vGate areaX5">
		<div class="top"></div>
		<div class="main gate">
			<div class="login">
				<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" width="509" height="288" src="<?php echo $iframe_src?>"></iframe>								
			</div>
			<div class="reg">
				<p>还没有帐号？请点击</p>
				<dl class="btn btnAdd"><dt></dt><dd><a href="/u.php?a=register">注册帐号</a></dd></dl>
				<!-- 
				<div class="otherwise">使用其他帐号登录<a class="qq" href="javascript:qqLogin();" title="通过QQ帐号" tabindex="-1">QQ</a></div>
				 -->
			</div>
		</div>
		<div class="bottom"></div>
	</div>
</div>
