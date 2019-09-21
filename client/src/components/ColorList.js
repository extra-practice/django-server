import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log(colorToEdit)
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        getData();
        setEditing(false)
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    console.log(color)
    axiosWithAuth().delete(`/colors/${color.id}`)
      .then(res => {
        getData()

      })
      .catch(err => console.log(err))

  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post("/colors", newColor)
      .then(res => {
        console.log(res)
        updateColors(res.data)
        getData();
        setNewColor(initialColor)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <label>Color Name</label>
        <input
          name="color"
          value={newColor.color}
          onChange={e =>
            setNewColor({
              ...newColor,
              color: e.target.value
            })
          }
        />
        <label>Hex Code</label>
        <input
          name="hex"
          type="color"
          value={newColor.code.hex}
          onChange={e =>
            setNewColor({
              ...newColor,
              code: { hex: e.target.value }
            })
          }
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default ColorList;
