<template>
  <div id="app" class="container-fluid bg-light" v-cloak>
		<div class="row">
			<div class="col-md-12 p-0">
				<div class="container">
					<nav class="navbar navbar-expand-lg navbar-light pl-0 pr-0">
						<router-link to="/" class="navbar-brand" tag="a">Logo</router-link>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="d-flex justify-content-end collapse navbar-collapse" id="navbarNavAltMarkup">
							<div class="navbar-nav">
								<router-link to="/" tag="a" class="nav-item nav-link" exact-active-class="active">Home</router-link>
								<router-link to="/about" tag="a" class="nav-item nav-link" active-class="active">About</router-link>
							</div>
						</div>
					</nav>
				</div>
				<router-view />
			</div>
		</div>
  </div>
</template>

<style lang="scss"></style>
