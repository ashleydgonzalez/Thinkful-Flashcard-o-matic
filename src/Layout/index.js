import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import DeckList from "../Home/DeckList";
import NotFound from "./NotFound";
import CreateDeck from "../CreateDeck/CreateDeck";
import DeckPage from "../DeckPage/DeckPage";
import AddCard from "../AddCard/AddCard";
import EditCard from "../EditCard/EditCard";
import EditDeck from "../EditDeck/EditDeck";
import Study from "../Study/Study";

export default function Layout() {

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {
          <Switch>
            <Route exact path="/">
              <DeckList />
            </Route>
            <Route exact path="/decks/new">
              <CreateDeck />
            </Route>
            <Route exact path="/decks/:deckId">
              <DeckPage />
            </Route>
            <Route exact path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route exact path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route exact path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route exact path="/decks/:deckId/study">
              <Study />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch> 
        }
      </div>
    </React.Fragment>
  );
}


