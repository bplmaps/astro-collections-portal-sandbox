<script>
  export let record;

  async function getImageURL(id) {
    const meta_endpoint = new URL(
      `https://collections.leventhalmap.org/search/${id.replace(
        "--",
        ":"
      )}?format=json`
    );
    const data = await fetch(meta_endpoint).then((response) => response.json());
    const exemplary_image = data.response.document.exemplary_image_ssi;
    const url = `https://bpldcassets.blob.core.windows.net/derivatives/images/${exemplary_image}/image_thumbnail_300.jpg`;
    return {"title": data.response.document.title_info_primary_tsi, "date": data.response.document.date_tsim, "imgURL": url}
  }

  let data = getImageURL(record.id);
</script>

<div>
    {#await data}
    <div class="italic text-gray-400 p-4">Loading record ...</div>
    {:then d}
    <div>
      <img src={d.imgURL} alt="" class="w-full h-48 object-cover">
    </div>
    <div class="font-serif p-2 text-lg">
      {d.title}
    </div>
    <div class="p-2 text-sm">
      {d.date}
    </div>
    {:catch error}
	  <p style="color: red">Error loading this item</p>
    {/await}
</div>
