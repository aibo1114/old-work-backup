<?php include TPL_PUBLIC_PATH . 'layout_header.php'?>
</head>
<body>
	<div id="wrapper"></div>
	<div id="basis">
		<?php include TPL_PUBLIC_PATH . 'top_nav.php'?>
		<!-- cont -->
		<div id="content">
			<div id="bar">
				<div class="barSpace">	
					<div class="part">
						<?php include $subtpl?>
					</div>
				</div>
			</div>
		</div>
	</div>
<?php include TPL_PUBLIC_PATH . 'layout_footer.php'?>