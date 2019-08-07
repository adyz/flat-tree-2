## The problem

You need to create a tree UI with your onw custom theme, verry flexible.


## The solution

This is a component that controls user interactions and state for you so you can create tree/grid components. It uses a render prop which gives you maximum flexibility with a minimal API because you are responsible for the rendering of everything and you simply apply props to what you're rendering.

This differs from other solutions which render things for their use case and then expose many options to allow for extensibility resulting in a bigger API that is less flexible as well as making the implementation more complicated and harder to contribute to.
