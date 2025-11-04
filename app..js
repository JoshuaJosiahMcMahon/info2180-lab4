const btn = document.getElementById("searchButton");

btn?.addEventListener("click", async () => {
    const resEl = document.getElementById('result')
    const inp = document.getElementById("rawInput");
    if (!resEl || !inp) return;

    let q = inp.value.trim();
    let url = q ? `superheroes.php?query=${encodeURIComponent(q)}` : "superheroes.php";

    try {
        console.log("fetching from", url);

        let r = await fetch(url, {
            headers: { "Accept": "application/json" },
            cache: "no-cache"
        });

        if (!r.ok) throw new Error("status: " + r.status);

        const heroes = (await r.json()) || [];
        resEl.innerHTML = "";

        if (!q) {
            const list = document.createElement('ul');
            for (const h of heroes) {
                const li = document.createElement('li');
                li.innerText = h.alias;
                list.appendChild(li);
            }
            resEl.appendChild(list);
            return;
        }

        if (heroes.length > 0) {
            const h = heroes[0];
            const a = document.createElement("h3");
            a.textContent = h.alias.toLocaleUpperCase();

            const n = document.createElement('h4');
            n.textContent = "A.K.A "+ h.name.toLocaleUpperCase();

            const bio = document.createElement("p");
            bio.textContent = h.biography;

            resEl.appendChild(a);
            resEl.appendChild(n);
            resEl.appendChild(bio);
        } else {
            resEl.textContent = "SUPERHERO NOT FOUND";
        }

    } catch (err) {
        console.log("oops", err);
    }
});