import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import {Login} from "../pages";
import Cart from "../components/Cart";
import CartComponent from "../components/Cart";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/Login">
        <Login/>
      </ComponentPreview>
      <ComponentPreview path="/Cart">
        <Cart/>
      </ComponentPreview>
      <ComponentPreview path="/CartComponent">
        <CartComponent/>
      </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews