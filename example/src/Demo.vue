<template>
  <div id="demo">
    <tree-view :tree="tree"/>
    <br />
    <v-tree :tree="tree"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tree: [
        {
          "text": "Dogs",
          "nodes": [{
            "text": "Germany",
            "nodes": [{
              "text": "American Eskimo Dog",
              "nodes": [{
                "text": "Fluffy",
                "link": {
                  "type": "link", // Type `link` will create an `Anchor` tag
                  "value": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/American_Eskimo_Dog_1.jpg/1920px-American_Eskimo_Dog_1.jpg" // URL of the link
                }
              }]
            }, {
              "text": "Bavarian Mountain Hound"
            }, {
              "text": "Boxer",
              "nodes": [{
                "text": "Rip (Router-link)",
                "link": {
                  "type": "router-link", // Type `router-link` will create a router-link, duh.
                  "key": "path", // key to use when giving it the value, router-link(:to="{ path: '/d-ger-boxer-rip' }")
                  "value": "/"
                }
              }, {
                "text": "Mackenzie (Router-link)",
                "link": {
                  "type": "router-link",
                  "key": "name",
                  "value": "/"
                }
              }]
            }, {
              "text": "Bullenbeisser"
            }, {
              "text": "Deutsche Bracke",
              "nodes": [{
                "text": "Mini",
                "link": {
                  "type": "link",
                  "value": "https://animalsbreeds.com/wp-content/uploads/2015/07/Deutsche-Bracke.jpg"
                }
              }]
            }]
          }, {
            "text": "France",
            "nodes": [{
              "text": "Ariegeois"
            }, {
              "text": "Artois Hound"
            }]
          }]
        }, {
          "text": "Cats",
          "nodes": [
            {
              "text": "Russia",
              "nodes": [{
                "text": "Donskoy"
              }, {
                "text": "Kurilian Bobtail"
              }]
            }, {
              "text": "Thailand",
              "nodes": [{
                "text": "Khao Manee"
              }, {
                "text": "Suphalak",
                "nodes": [{
                  "text": "Moon",
                  "link": {
                    "type": "link",
                    "value": "https://www.pets4homes.co.uk/images/articles/4198/what-is-a-suphalak-cat-5947aefcd4845.jpg"
                  }
                }]
              }]
            }
          ]
        },
        { // >= v0.3.0
          "text": "Standing Up",
          "link": {
            "type": "router-link",
            "key": "path",
            "value": "/"
          },
          "icon": "cube",
          "nodes": [
            {
              "text": "mixamo.com",
              "link": {
                "type": "router-link",
                "key": "path",
                "value": "/"
              },
              "icon": "running"
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
