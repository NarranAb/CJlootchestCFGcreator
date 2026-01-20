import React, { useState } from "react";

// DayZ CJ Loot Chest Config Builder
// Single-file React app

export default function App() {
  const [chests, setChests] = useState([]);
  const [currentChest, setCurrentChest] = useState({
    name: "",
    position: { x: 0, y: 0, z: 0 },
    key: "",
    loot: [],
  });

  const [lootItem, setLootItem] = useState({
    item: "",
    amount: 1,
    chance: 1.0,
  });

  const addLoot = () => {
    if (!lootItem.item) return;
    setCurrentChest({
      ...currentChest,
      loot: [...currentChest.loot, lootItem],
    });
    setLootItem({ item: "", amount: 1, chance: 1.0 });
  };

  const addChest = () => {
    if (!currentChest.name) return;
    setChests([...chests, currentChest]);
    setCurrentChest({
      name: "",
      position: { x: 0, y: 0, z: 0 },
      key: "",
      loot: [],
    });
  };

  const exportConfig = () => {
    const config = {
      CJLootChests: chests.map((c) => ({
        ChestName: c.name,
        Position: [c.position.x, c.position.y, c.position.z],
        Key: c.key,
        Loot: c.loot.map((l) => ({
          Item: l.item,
          Amount: l.amount,
          Chance: l.chance,
        })),
      })),
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CJ_LootChest_Config.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">
        DayZ CJ Loot Chest Config Builder
      </h1>

      <div className="bg-gray-800 p-4 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl mb-2">Create Chest</h2>
        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Chest Name"
          value={currentChest.name}
          onChange={(e) =>
            setCurrentChest({ ...currentChest, name: e.target.value })
          }
        />

        <div className="grid grid-cols-3 gap-2 mb-2">
          <input
            className="p-2 text-black"
            type="number"
            placeholder="X"
            onChange={(e) =>
              setCurrentChest({
                ...currentChest,
                position: {
                  ...currentChest.position,
                  x: Number(e.target.value),
                },
              })
            }
          />
          <input
            className="p-2 text-black"
            type="number"
            placeholder="Y"
            onChange={(e) =>
              setCurrentChest({
                ...currentChest,
                position: {
                  ...currentChest.position,
                  y: Number(e.target.value),
                },
              })
            }
          />
          <input
            className="p-2 text-black"
            type="number"
            placeholder="Z"
            onChange={(e) =>
              setCurrentChest({
                ...currentChest,
                position: {
                  ...currentChest.position,
                  z: Number(e.target.value),
                },
              })
            }
          />
        </div>

        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Key Item (optional)"
          value={currentChest.key}
          onChange={(e) =>
            setCurrentChest({ ...currentChest, key: e.target.value })
          }
        />

        <h3 className="text-lg mt-4">Add Loot</h3>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <input
            className="p-2 text-black"
            placeholder="Item Classname"
            value={lootItem.item}
            onChange={(e) => setLootItem({ ...lootItem, item: e.target.value })}
          />
          <input
            className="p-2 text-black"
            type="number"
            placeholder="Amount"
            value={lootItem.amount}
            onChange={(e) =>
              setLootItem({ ...lootItem, amount: Number(e.target.value) })
            }
          />
          <input
            className="p-2 text-black"
            type="number"
            step="0.1"
            placeholder="Chance"
            value={lootItem.chance}
            onChange={(e) =>
              setLootItem({ ...lootItem, chance: Number(e.target.value) })
            }
          />
        </div>
        <button className="bg-green-600 px-4 py-2 rounded-xl" onClick={addLoot}>
          Add Loot
        </button>

        <ul className="mt-3 text-sm">
          {currentChest.loot.map((l, i) => (
            <li key={i}>
              {l.item} x{l.amount} ({l.chance * 100}%)
            </li>
          ))}
        </ul>

        <button
          className="bg-blue-600 px-4 py-2 rounded-xl mt-4"
          onClick={addChest}
        >
          Add Chest
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl mb-2">Chests</h2>
        <ul className="text-sm">
          {chests.map((c, i) => (
            <li key={i} className="mb-2">
              📦 {c.name} @ {c.position.x},{c.position.y},{c.position.z} | Key:{" "}
              {c.key || "None"} | Loot items: {c.loot.length}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="bg-purple-600 px-6 py-3 rounded-2xl text-lg"
        onClick={exportConfig}
      >
        Export Config JSON
      </button>
    </div>
  );
}
