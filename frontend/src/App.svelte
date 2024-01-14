<script>

	let teamX=3;
	let teamY=3;
	let possibilities = [];
	let errorMessage = 'Erreur inattendue';

	const calculatePossibilities = async () => {
		if(teamX < 3 || teamY < 3) {
			errorMessage = 'Erreur : Les scores doivent être au minimum à 3';
			return;
		}
		else{
			try {
				const response = await fetch('http://localhost:3001/af_scores', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"teamX": teamX,
						"teamY": teamY
					}),
				});
				if (response.ok) {
					possibilities = await response.json();
					errorMessage = '';
					console.log('Résultats possibles :', possibilities);
				} else if (response.status === 400) {
					errorMessage = 'Erreur : Données d\'entrée invalides';
				}else if (response.status === 500) {
					errorMessage = 'Erreur : Le serveur a rencontré un problème, veuillez vérifier les données d\'entrée';
				}else {
					console.error('Erreur lors de la requête:', response.statusText);
					errorMessage = 'Erreur inattendue';
				}
			} catch (error) {
				console.error('Erreur:', error.message);
				errorMessage = 'Erreur inattendue';
			}
		}

	};
</script>

<main>
	<h1>American Football</h1>
	<form>

		<label for="teamX">Team X</label>
		<input id="teamX" name="teamX" type="number" min="3" bind:value={teamX}>
		
		<label for="teamY">Team Y</label>	
		<input id="teamY"  name="teamY" type="number" min="3" bind:value={teamY}>
		<br>
		<button on:click|preventDefault={calculatePossibilities}>Ask possibility to API</button>
	</form>

	{#if possibilities.length > 0}
	
		<div class="results">
			<div class="teamX">
				<h2>Team X</h2>
				{#each possibilities[0] as possibilityX}
					<p>{possibilityX}</p>
				{/each}
			</div>
			<div class="teamY">
				<h2>Team Y</h2>
				{#each possibilities[1] as possibilityY}
					<p>{possibilityY}</p>
				{/each}
			</div>
		</div>
	{:else if errorMessage !== ''}
		<p>{errorMessage}</p>
	{:else}
		<p>Waiting...</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	form {
		margin-top: 40px;

	}

	button {
		width: 20rem;
		background-color: rgb(56, 56, 56);
		color: white;
		border-radius: 30px;
	}

	.results {
		margin-top: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>