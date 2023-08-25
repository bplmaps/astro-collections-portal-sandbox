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
    let title = data.response.document.title_info_primary_tsi;
    const exemplary_image = data.response.document.exemplary_image_ssi;
    const url = `https://bpldcassets.blob.core.windows.net/derivatives/images/${exemplary_image}/image_thumbnail_300.jpg`;
    return url;
  }

  let data = getImageURL(record.id);
</script>

<div>
    {#await data}
    ...
    {:then d}
    <img src={d} alt="" class="w-full">
    {:catch error}
	<p style="color: red">Error loading this item</p>
    {/await}
</div>
