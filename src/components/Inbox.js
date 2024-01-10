import React, { Component, useState } from "react";

import { Categories } from "./templates/InboxHtml";
import ModalCompose from "./ModalCompose";
import ModalMessage from "./ModalMessage";
import searchBox from "./templates/navbar";
import messages from "../data/messages.json";
import SearchBox from "./templates/searchbox"; // or './searchbox.js' if it's a .js file
import BookComponent from "./templates/book";
import NavigationBar from "./templates/navbar";
import PaginationComponent from "./templates/pagination";
import Footer from "./templates/footer";

export class Inbox extends Component {
  constructor(props) {
    super(props);
    this.markRead = this.markRead.bind(this);
    this.doShow = this.doShow.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.toggleMark = this.toggleMark.bind(this);
    this.toggleMarkAll = this.toggleMarkAll.bind(this);
    this.deleteMarked = this.deleteMarked.bind(this);
    this.refreshMessages = this.refreshMessages.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
    this.ModalMessage = React.createRef();
    this.ModalCompose = React.createRef();
    this.state = {
      initMessages: messages,
      messages: messages,
      selected: {},
      filteredBooks: [],
      currentPage: 1,
      totalPages: 10,
      deleted: [],
    };
  }

  handlePageChange = (page) => {
    // Add logic here to fetch and update data for the selected page
    this.setState({ currentPage: page });
  };
  handleSearch = (searchParams) => {
    // Add logic here to perform the actual search based on the search term and criteria
  };
  markRead = (idx) => {
    /* mark this message as read */
    let messages = [...this.state.messages];
    messages[idx].read = true;
    this.setState({ messages });
  };

  doShow = (idx) => {
    this.markRead(idx);
    this.setState({
      selected: messages[idx],
    });
    /* open message in modal */
    this.ModalMessage.current.show();
  };

  doCompose = () => {
    /* open compose modal */
    this.ModalCompose.current.show();
  };

  toggleMark = (idx) => {
    let messages = [...this.state.messages];
    messages[idx].marked = messages[idx].marked ? 0 : 1;
    this.setState({ messages });
  };

  doDelete = (idx) => {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    /* append it to deleted */
    deleted.push(messages[idx]);
    /* remove the message at idx */
    messages.splice(idx, 1);
    this.setState({ messages, deleted });
  };

  toggleMarkAll = () => {
    let messages = [...this.state.messages];
    messages.map((v, k) => {
      return (v.marked = v.marked ? 0 : 1);
    });
    this.setState({ messages });
  };

  deleteMarked = () => {
    var self = this;
    let messages = [...this.state.messages];
    var tbd = [];
    for (var k = 0; k < messages.length; k++) {
      if (messages[k].marked === 1) {
        tbd.push(k);
      }
    }

    if (tbd.length > 0) {
      self.deleteMessages(tbd);
    }
  };

  refreshMessages = () => {
    let initMessages = [...this.state.initMessages];
    this.setState({ messages: initMessages });
  };
  handleSearch = ({ term, by }) => {
    const { initMessages } = this.state;
    const searchTermLower = term.toLowerCase();

    // Filter messages based on the search term and criteria
    const filtered = initMessages.filter((message) => {
      const searchField = message[by].toLowerCase();
      return searchField.includes(searchTermLower);
    });

    // Set the filtered messages in the state
    this.setState({ messages: filtered });
  };

  deleteMessages = (arr) => {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    for (var i = arr.length - 1; i >= 0; i--) {
      deleted.push(messages[i]);
      messages.splice(arr[i], 1);
    }
    this.setState({ messages, deleted });
  };

  render() {
    const { currentPage, totalPages, filteredBooks, messages } = this.state;

    return (
      <div>
        <SearchBox onSearch={this.handleSearch} />
        <BookComponent
          books={filteredBooks.length > 0 ? filteredBooks : messages}
        />

        <ModalCompose sendTo={this.state.selected.fromAddress} />
        <ModalMessage ref={this.ModalMessage} message={this.state.selected} />
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
          itemsPerPage={5}
        />
      </div>
    );
  }
}

export default Inbox;
